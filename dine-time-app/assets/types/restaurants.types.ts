export type RestaurantType = {
  name: string,
  seats: number,
  image: string,
  address: string,
  opening: string,
  closing: string,
}

export type CarouseImageType = {
  images: string[],
  res_id: string,
}
export type SlotType = {
  ref_id: string,
  slot: string[]
}
export type BookingType = {
  id: string,
  date: string,
  email: string,
  guests: number,
  restaurant: string,
  slot: string,
}