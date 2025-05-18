export interface FieldType {
  name: string
  icon: string
}

export interface Category {
  id: string
  name: string
  name_ar: string
  extra_field_types: FieldType[]
  sub_item_type: string
}

export interface CategoryGroup {
  id: string
  name: string
  name_ar: string
  icon: string
  categories: Category[]
}
