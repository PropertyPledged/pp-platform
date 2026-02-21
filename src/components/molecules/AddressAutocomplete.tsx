'use client'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { env } from '@/env'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import * as React from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface AddressSuggestion {
   address: string
   id: string
   url: string
}

interface AddressAutocompleteProps<T extends FieldValues> {
   control: Control<T>
   addressFieldName: Path<T>
   postcodeFieldName: Path<T>
   label?: string
   placeholder?: string
}

const fetchAddressSuggestions = async (input: string): Promise<AddressSuggestion[]> => {
   if (input.length < 4) {
      return []
   }

   const response = await fetch(`https://api.getaddress.io/autocomplete/${encodeURIComponent(input)}?api-key=${env.NEXT_PUBLIC_GETADDRESS_IO_KEY}`)
   const data = await response.json()

   if (data.suggestions) {
      return data.suggestions
   }
   return []
}

export default function AddressAutocomplete<T extends FieldValues>({ control, addressFieldName, postcodeFieldName, label = 'Property address', placeholder = 'Search address' }: AddressAutocompleteProps<T>) {
   const [open, setOpen] = React.useState(false)
   const [searchInput, setSearchInput] = React.useState('')

   const { data: addressSuggestions = [], isLoading: isLoadingAddresses } = useQuery({
      queryKey: ['addressSuggestions', searchInput],
      queryFn: () => fetchAddressSuggestions(searchInput),
      enabled: searchInput.length >= 4,
      staleTime: 5 * 60 * 1000,
   })

   return (
      <Controller
         control={control}
         name={addressFieldName}
         render={({ field, fieldState: { error } }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="text-gray-900">{label}</FormLabel>
               <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button variant="outline" role="combobox" aria-expanded={open} className={cn('h-12 w-full justify-between', !field.value && 'text-muted-foreground')}>
                           {field.value || placeholder}
                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                     <Command shouldFilter={false}>
                        <CommandInput placeholder={placeholder} value={searchInput.toUpperCase()} onValueChange={setSearchInput} className="h-12" />
                        {isLoadingAddresses ? (
                           <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                           </div>
                        ) : addressSuggestions.length > 0 ? (
                           <CommandList>
                              <CommandGroup>
                                 {addressSuggestions.map((suggestion, index) => (
                                    <CommandItem
                                       key={index}
                                       value={suggestion.address}
                                       onSelect={(currentValue) => {
                                          field.onChange(currentValue === field.value ? '' : currentValue)
                                          setOpen(false)
                                          setSearchInput('')
                                       }}>
                                       <Check className={cn('mr-2 h-4 w-4', field.value === suggestion.address ? 'opacity-100' : 'opacity-0')} />
                                       <div className="flex-1">
                                          <div className="font-medium text-gray-900">{suggestion.address}</div>
                                       </div>
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                           </CommandList>
                        ) : (
                           <CommandEmpty>No addresses found.</CommandEmpty>
                        )}
                     </Command>
                  </PopoverContent>
               </Popover>
               {error && <FormMessage>{error.message}</FormMessage>}
            </FormItem>
         )}
      />
   )
}
