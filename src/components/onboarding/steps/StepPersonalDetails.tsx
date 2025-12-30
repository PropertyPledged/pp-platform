import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OnboardingValues } from "../OnboardingForm";

export default function StepPersonalDetails() {
  const { control } = useFormContext<OnboardingValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Name</FormLabel>
            <FormControl>
              <Input placeholder="Jane Doe" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="janedoe@gmail.com"
                {...field}
                className="h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Phone number</FormLabel>
            <FormControl>
              <Input placeholder="UK +1" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Choose your role</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-gray-500">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tenant">I am a Tenant</SelectItem>
                <SelectItem value="leaseholder">I am a Leaseholder</SelectItem>
                <SelectItem value="landlord">I am a Landlord or Agent</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
