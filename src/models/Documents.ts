export interface DocumentsModel {
  id: number
  document_number?: string
  document_name?: string
  document_file?: File
  created_by: string
  uploaded_at: Date
  uploaded_by: string
  document_desc: string
  type?: string
  file: File | null
  title: string
  related_to: string
  status?: string
}
export interface SubDocuments {
  issue_date: string
  file: string
  id: number
  uploaded_by: string
  uploaded_at: string
  user_image?: string
}

export interface List {
  id: string
  uploaded_by?: string
  contract_number?: string
  title?: string
  isDue: boolean
  document_number?: string
  document_name?: string
  document_file?: File
  created_by: string
  uploaded_at: Date
  document_desc: string
  type?: string
  file?: File | null
  related_to: string
  status?: string
}
