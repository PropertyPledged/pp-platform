"use client";

import { createResponse } from "@/actions/createResponse";
import {
  Form,
  FormControl,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Loader } from "lucide-react";
import type { SuggestionsResult } from "sanity.types";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import Heading from "../atoms/Heading";
import ListWrapper from "../atoms/ListWrapper";
import MultiSelectDropdown from "../molecules/MultiselectDropdown";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type SuggestionFormProps = {
  suggestions: SuggestionsResult;
};

function SuggestionForm({ suggestions }: SuggestionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SuggestionType>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      name: "",
      email: "",
      responses: {},
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    startTransition(() => {
      for (const [id, value] of Object.entries(data.responses)) {
        createResponse({
          id,
          value,
          name: data.name,
          email: data.email,
        })
          .then(() => {
            console.log("Response created");
          })
          .catch((error) => {
            throw error;
          });
      }

      // clear the form
      form.reset();
      router.push("/suggestion/confirmation");
    });
  });

  return (
    <div className="mx-auto w-full max-w-lg">
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
              <ListWrapper list={suggestions} keyExtractor={(sugg) => sugg._id}>
                {(suggestion) => {
                  const options = suggestion?.options?.map((option) => ({
                    label: option?.title ?? "",
                    value: `${option.title ?? ""}: ${option.question ?? ""}`,
                  }));

                  return (
                    <div className="flex flex-col items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`responses.${suggestion?._id}`}
                        render={({ field }) => {
                          // get the value
                          let currentValue = [] as string[];

                          if (field?.value?.length > 0) {
                            currentValue = field?.value.map(
                              (item) => item.question,
                            );
                          }

                          return (
                            <FormItem className="w-full space-y-2">
                              <FormLabel>{suggestion.name ?? ""}</FormLabel>
                              <FormControl>
                                <MultiSelectDropdown
                                  value={currentValue}
                                  options={options ?? []}
                                  onValueChange={(value) => {
                                    const newValue = value.map((opt) => ({
                                      question: opt,
                                      response: "",
                                      createdAt: new Date(),
                                    }));
                                    field.onChange(newValue);
                                  }}
                                  renderTrigger={() => (
                                    <Button
                                      variant="outline"
                                      className="flex h-10 w-full justify-between font-normal"
                                    >
                                      <span className="flex w-3/4 flex-wrap items-center justify-start gap-1">
                                        <ListWrapper
                                          list={currentValue}
                                          renderFallback={() => "Select option"}
                                          keyExtractor={(opt) => opt}
                                        >
                                          {(opt) => (
                                            <Badge>{opt.split(":")[0]}</Badge>
                                          )}
                                        </ListWrapper>
                                      </span>
                                      <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                  )}
                                />
                              </FormControl>

                              <ListWrapper
                                list={currentValue}
                                keyExtractor={(opt) => opt.split(":")[0] ?? ""}
                              >
                                {(option, index) => (
                                  <FormField
                                    control={form.control}
                                    name={`responses.${suggestion?._id}.${index}.response`}
                                    render={({ field }) => (
                                      <FormItem className="my-4">
                                        <FormLabel>{option}</FormLabel>
                                        <FormControl>
                                          <Textarea
                                            value={field.value}
                                            className="w-full"
                                            onChange={(e) =>
                                              field.onChange(e.target.value)
                                            }
                                            onBlur={field.onBlur}
                                            placeholder="Enter your response"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
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
