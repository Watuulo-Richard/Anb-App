import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface FormData {
  title: string
  location: string
  description: string
  amenities: { [key: string]: boolean }
  images: string[]
  price: number
  maxGuests: number
  availability: Date[]
}

interface FormState {
  step: number
  formData: FormData
  setStep: (step: number) => void
  updateFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

const initialFormData: FormData = {
  title: "",
  location: "",
  description: "",
  amenities: {
    Wifi: false,
    TV: false,
    "Coffee Maker": false,
    "Private Bath": false,
    Parking: false,
    Kitchen: false,
    "Air Conditioning": false,
    Heating: false,
  },
  images: [],
  price: 0,
  maxGuests: 1,
  availability: [],
}

export const useFormStore = create<FormState>()(
  devtools((set) => ({
    step: 1,
    formData: initialFormData,
    setStep: (step) => set({ step }),
    updateFormData: (data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          ...data,
          amenities: {
            ...state.formData.amenities,
            ...data.amenities, // Merge the updated amenities
          },
        },
      })),
    resetForm: () => set({ step: 1, formData: initialFormData }),
  }))
)
