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
import { Search, Upload } from "lucide-react";

export default function StepPropertyInfo() {
  const { control } = useFormContext<OnboardingValues>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search location"
                  {...field}
                  className="h-12 pl-10"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Property address</FormLabel>
            <FormControl>
              <Input placeholder="Search address" {...field} className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="propertyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Property type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-gray-500">
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900">Duration of stay</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-gray-500">
                  <SelectValue placeholder="Enter duration" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0-6">0-6 months</SelectItem>
                <SelectItem value="6-12">6-12 months</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="2+">2+ years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel className="text-gray-900">
          Upload lease agreement (optional)
        </FormLabel>
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-10 text-center">
          <div className="mb-2 rounded-full bg-white p-2 shadow-sm">
            <Upload className="h-6 w-6 text-slate-900" />
          </div>
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">your file here</p>
        </div>
      </div>
    </div>
  );
}
