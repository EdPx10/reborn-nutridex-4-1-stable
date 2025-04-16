export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aliment_bienfait: {
        Row: {
          aliment_id: string
          bienfait_id: string
        }
        Insert: {
          aliment_id: string
          bienfait_id: string
        }
        Update: {
          aliment_id?: string
          bienfait_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aliment_bienfait_aliment_id_fkey"
            columns: ["aliment_id"]
            isOneToOne: false
            referencedRelation: "aliments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aliment_bienfait_bienfait_id_fkey"
            columns: ["bienfait_id"]
            isOneToOne: false
            referencedRelation: "bienfaits"
            referencedColumns: ["id"]
          },
        ]
      }
      aliment_saison: {
        Row: {
          aliment_id: string
          saison_id: string
        }
        Insert: {
          aliment_id: string
          saison_id: string
        }
        Update: {
          aliment_id?: string
          saison_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "aliment_saison_aliment_id_fkey"
            columns: ["aliment_id"]
            isOneToOne: false
            referencedRelation: "aliments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aliment_saison_saison_id_fkey"
            columns: ["saison_id"]
            isOneToOne: false
            referencedRelation: "saisons"
            referencedColumns: ["id"]
          },
        ]
      }
      aliments: {
        Row: {
          calcium_mg: number
          categorie_id: string
          chrome_ug: number
          created_at: string | null
          cuivre_mg: number
          fer_mg: number
          fibres: number
          glucides: number
          id: string
          image_url: string | null
          iode_ug: number
          lipides: number
          lipides_mono_insatures: number
          lipides_poly_insatures: number
          lipides_satures: number
          magnesium_mg: number
          manganese_mg: number
          molybdene_ug: number
          nom: string
          omega_3: number
          omega_6: number
          phosphore_mg: number
          potassium_mg: number
          proteines: number
          selenium_ug: number
          sodium_mg: number
          updated_at: string | null
          vitamine_a_ug: number
          vitamine_b1_mg: number
          vitamine_b12_ug: number
          vitamine_b2_mg: number
          vitamine_b3_mg: number
          vitamine_b5_mg: number
          vitamine_b6_mg: number
          vitamine_b8_ug: number
          vitamine_b9_ug: number
          vitamine_c_mg: number
          vitamine_d_ug: number
          vitamine_e_mg: number
          vitamine_k1_ug: number
          zinc_mg: number
        }
        Insert: {
          calcium_mg?: number
          categorie_id: string
          chrome_ug?: number
          created_at?: string | null
          cuivre_mg?: number
          fer_mg?: number
          fibres?: number
          glucides?: number
          id?: string
          image_url?: string | null
          iode_ug?: number
          lipides?: number
          lipides_mono_insatures?: number
          lipides_poly_insatures?: number
          lipides_satures?: number
          magnesium_mg?: number
          manganese_mg?: number
          molybdene_ug?: number
          nom: string
          omega_3?: number
          omega_6?: number
          phosphore_mg?: number
          potassium_mg?: number
          proteines?: number
          selenium_ug?: number
          sodium_mg?: number
          updated_at?: string | null
          vitamine_a_ug?: number
          vitamine_b1_mg?: number
          vitamine_b12_ug?: number
          vitamine_b2_mg?: number
          vitamine_b3_mg?: number
          vitamine_b5_mg?: number
          vitamine_b6_mg?: number
          vitamine_b8_ug?: number
          vitamine_b9_ug?: number
          vitamine_c_mg?: number
          vitamine_d_ug?: number
          vitamine_e_mg?: number
          vitamine_k1_ug?: number
          zinc_mg?: number
        }
        Update: {
          calcium_mg?: number
          categorie_id?: string
          chrome_ug?: number
          created_at?: string | null
          cuivre_mg?: number
          fer_mg?: number
          fibres?: number
          glucides?: number
          id?: string
          image_url?: string | null
          iode_ug?: number
          lipides?: number
          lipides_mono_insatures?: number
          lipides_poly_insatures?: number
          lipides_satures?: number
          magnesium_mg?: number
          manganese_mg?: number
          molybdene_ug?: number
          nom?: string
          omega_3?: number
          omega_6?: number
          phosphore_mg?: number
          potassium_mg?: number
          proteines?: number
          selenium_ug?: number
          sodium_mg?: number
          updated_at?: string | null
          vitamine_a_ug?: number
          vitamine_b1_mg?: number
          vitamine_b12_ug?: number
          vitamine_b2_mg?: number
          vitamine_b3_mg?: number
          vitamine_b5_mg?: number
          vitamine_b6_mg?: number
          vitamine_b8_ug?: number
          vitamine_b9_ug?: number
          vitamine_c_mg?: number
          vitamine_d_ug?: number
          vitamine_e_mg?: number
          vitamine_k1_ug?: number
          zinc_mg?: number
        }
        Relationships: [
          {
            foreignKeyName: "aliments_categorie_id_fkey"
            columns: ["categorie_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bienfaits: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
      saisons: {
        Row: {
          id: string
          nom: string
        }
        Insert: {
          id?: string
          nom: string
        }
        Update: {
          id?: string
          nom?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_aliment_with_relations: {
        Args: {
          p_nom: string
          p_categorie: string
          p_image_url: string
          p_glucides: number
          p_proteines: number
          p_lipides: number
          p_fibres: number
          p_vitamine_a_ug?: number
          p_vitamine_d_ug?: number
          p_vitamine_e_mg?: number
          p_vitamine_k1_ug?: number
          p_vitamine_c_mg?: number
          p_vitamine_b12_ug?: number
          p_calcium_mg?: number
          p_magnesium_mg?: number
          p_fer_mg?: number
          p_potassium_mg?: number
          p_bienfaits?: string[]
          p_saisons?: string[]
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
