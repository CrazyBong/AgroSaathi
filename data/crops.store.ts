import { Crop } from "@/core/types"

const g = globalThis as any

if (!g.__CROPS__) {
  g.__CROPS__ = []
}

export const crops: Crop[] = g.__CROPS__

export function addCrop(crop: Crop) {
  crops.push(crop)
}

export function getCropById(id: string) {
  return crops.find(c => c.id === id)
}