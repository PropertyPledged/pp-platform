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
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white/80 p-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Your name</FormLabel>
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
                placeholder="you@email.com"
                {...field}
                className="h-12 bg-slate-50 text-slate-600"
                readOnly
              />
            </FormControl>
            <p className="text-xs text-slate-500">
              Prefilled from your sign in method.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Phone number (optional)</FormLabel>
            <FormControl>
              <Input placeholder="+44 7000 000000" {...field} className="h-12" />
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
            <FormLabel className="text-gray-900">How are you joining?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-gray-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="tenant">Tenant</SelectItem>
                <SelectItem value="leaseholder">Leaseholder</SelectItem>
                <SelectItem value="landlord">Landlord</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="destination"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Where should we take you next?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-gray-500">
                  <SelectValue placeholder="Choose next step" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="profile">My profile (reviews)</SelectItem>
                <SelectItem value="search">Property search</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
