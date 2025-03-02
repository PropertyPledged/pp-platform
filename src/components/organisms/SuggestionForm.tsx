"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  suggestionSchema,
  type SuggestionType,
} from "@/schemas/suggestionSchema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader, Trash } from "lucide-react";
import type { SuggestionsQueryResult } from "sanity.types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../atoms/Heading";
import ListWrapper from "../atoms/ListWrapper";
import Text from "../atoms/Text";
import MultiSelectDropdown from "../molecules/MultiselectDropdown";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type SuggestionFormProps = {
  suggestions: SuggestionsQueryResult;
};

function SuggestionForm({ suggestions }: SuggestionFormProps) {
  const router = useRouter();
  const form = useForm<SuggestionType>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      name: "",
      email: "",
      responses: {},
    },
  });

  const { mutate, isPending } = api.suggestion.respond.useMutation({
    onSettled: (_, error) => {
      if (error) {
        return toast.error(error.message);
      }

      router.push("/suggestion/confirmation");
      form.reset();
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* <div className="absolute -left-72 h-auto min-h-[300px] w-[400px] overflow-hidden bg-blue-50 p-3">
        <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      </div> */}
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Jane Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="janedoe@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <Heading as="h5" className="text-lg">
              Select a category to share your thoughts and help us improve
            </Heading>

            <div className="space-y-3">
              <ListWrapper
                list={suggestions}
                keyExtractor={(sugg) => sugg._id}
                renderFallback={() => (
                  <Text variant="muted" className="text-center">
                    😕 No suggestions currently available!
                  </Text>
                )}
              >
                {(suggestion) => {
                  const options = suggestion?.options?.map((option) => ({
                    label: option?.title ?? "",
                    value: `${option.title ?? ""}:${option.question ?? ""}`,
                  }));

                  return (
                    <div className="flex flex-col items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`responses.${suggestion?._id}`}
                        render={({ field: suggestionField }) => {
                          // get the value
                          const response = form.watch(
                            `responses.${suggestion?._id}`,
                          );
                          let currentValue = [] as string[];

                          if (suggestionField?.value?.length > 0) {
                            currentValue = suggestionField?.value.map(
                              (item) => item.question,
                            );
                          }

                          return (
                            <FormItem className="w-full space-y-6">
                              <div className="space-y-2">
                                <FormLabel className="text-base">
                                  {suggestion.name ?? ""}
                                </FormLabel>
                                <FormDescription className="text-sm">
                                  {suggestion.goal ?? ""}
                                </FormDescription>
                                <FormControl className="pb-10">
                                  <MultiSelectDropdown
                                    value={currentValue}
                                    options={options ?? []}
                                    onValueChange={(value) => {
                                      const newValue = value.map((opt) => {
                                        // update existing responses with their values
                                        const existingRes = response?.find(
                                          (item) => item.question === opt,
                                        );
                                        return {
                                          question: opt,
                                          response: existingRes?.response ?? "",
                                          createdAt:
                                            existingRes?.createdAt ??
                                            new Date(),
                                        };
                                      });

                                      suggestionField.onChange(newValue);
                                    }}
                                    renderTrigger={() => (
                                      <Button
                                        variant="outline"
                                        className="flex h-auto min-h-10 w-full justify-between font-normal transition-all duration-300"
                                      >
                                        <span className="flex w-full flex-wrap items-center justify-start gap-1">
                                          <ListWrapper
                                            list={currentValue ?? []}
                                            renderFallback={() =>
                                              "Select option"
                                            }
                                            keyExtractor={(opt) => opt}
                                          >
                                            {(opt) => (
                                              <Badge>
                                                {opt?.split(":")[0] ?? ""}
                                              </Badge>
                                            )}
                                          </ListWrapper>
                                          {currentValue.length > 0 &&
                                            currentValue?.length !==
                                              options?.length && (
                                              <span className="text-sm text-gray-400">
                                                select option
                                              </span>
                                            )}
                                        </span>
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                      </Button>
                                    )}
                                  />
                                </FormControl>
                                {currentValue?.length > 1 && (
                                  <button
                                    type="button"
                                    className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
                                    onClick={() => {
                                      form.resetField(
                                        `responses.${suggestion?._id}`,
                                      );
                                    }}
                                  >
                                    Clear options
                                  </button>
                                )}
                              </div>

                              <ListWrapper
                                list={currentValue}
                                keyExtractor={(opt) => opt?.split(":")[0] ?? ""}
                              >
                                {(option, index) => (
                                  <FormField
                                    control={form.control}
                                    name={`responses.${suggestion?._id}.${index}.response`}
                                    render={({ field }) => {
                                      const [opt, question] =
                                        option?.split(":");

                                      return (
                                        <FormItem>
                                          <div className="flex items-center justify-between gap-2">
                                            <div>
                                              <FormLabel className="max-w-md leading-normal">
                                                {opt}
                                              </FormLabel>
                                              <FormDescription className="text-sm">
                                                {question}
                                              </FormDescription>
                                            </div>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => {
                                                suggestionField.onChange(
                                                  suggestionField.value.filter(
                                                    (_, idx) => idx !== index,
                                                  ),
                                                );
                                                if (
                                                  suggestionField.value
                                                    .length === 1
                                                ) {
                                                  form.resetField(
                                                    `responses.${suggestion?._id}`,
                                                  );
                                                }
                                              }}
                                            >
                                              <Trash className="h-4 w-4" />
                                            </Button>
                                          </div>
                                          <FormControl>
                                            <Textarea
                                              value={field.value}
                                              className="min-h-40 w-full"
                                              onChange={(e) =>
                                                field.onChange(e.target.value)
                                              }
                                              onBlur={field.onBlur}
                                              placeholder="Enter your response"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      );
                                    }}
                                  />
                                )}
                              </ListWrapper>
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  );
                }}
              </ListWrapper>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className="w-full gap-3 transition-all"
          >
            {isPending && <Loader className="size-5 animate-spin" />}
            Submit feedback
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SuggestionForm;
