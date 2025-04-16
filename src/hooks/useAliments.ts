
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Food } from '@/types';

type AlimentFromDB = {
  id: string;
  nom: string;
  categorie_id: string;
  image_url: string | null;
  glucides: number;
  proteines: number;
  lipides: number;
  fibres: number;
  vitamine_a_ug: number;
  vitamine_d_ug: number;
  vitamine_e_mg: number;
  vitamine_k1_ug: number;
  vitamine_c_mg: number;
  vitamine_b12_ug: number;
  calcium_mg: number;
  magnesium_mg: number;
  fer_mg: number;
  potassium_mg: number;
};

const mapAlimentToFood = async (aliment: AlimentFromDB): Promise<Food> => {
  // Fetch category name
  const { data: categoryData } = await supabase
    .from('categories')
    .select('nom')
    .eq('id', aliment.categorie_id)
    .single();

  // Fetch health benefits
  const { data: benefitsData } = await supabase
    .from('aliment_bienfait')
    .select('bienfaits(nom)')
    .eq('aliment_id', aliment.id);

  // Fetch seasons
  const { data: seasonsData } = await supabase
    .from('aliment_saison')
    .select('saisons(nom)')
    .eq('aliment_id', aliment.id);

  const healthBenefits = benefitsData?.map(b => (b.bienfaits as any).nom) || [];
  const seasons = seasonsData?.map(s => (s.saisons as any).nom) || [];

  return {
    id: aliment.id,
    name: aliment.nom,
    category: categoryData?.nom || 'autres',
    image: aliment.image_url || undefined,
    nutrients: {
      glucides: aliment.glucides,
      proteines: aliment.proteines,
      lipides: aliment.lipides,
      fibres: aliment.fibres,
      vitamines: {
        vitamineA: aliment.vitamine_a_ug || undefined,
        vitamineD: aliment.vitamine_d_ug || undefined,
        vitamineE: aliment.vitamine_e_mg || undefined,
        vitamineK1: aliment.vitamine_k1_ug || undefined,
        vitamineC: aliment.vitamine_c_mg || undefined,
        vitamineB12: aliment.vitamine_b12_ug || undefined,
      },
      mineraux: {
        calcium: aliment.calcium_mg || undefined,
        magnesium: aliment.magnesium_mg || undefined,
        potassium: aliment.potassium_mg || undefined,
      },
      oligoelements: {
        fer: aliment.fer_mg || undefined,
      },
    },
    healthBenefits,
    seasons,
    portion: {
      amount: 100,
      unit: 'g'
    }
  };
};

export const useAliments = () => {
  return useQuery({
    queryKey: ['aliments'],
    queryFn: async () => {
      const { data: aliments, error } = await supabase
        .from('aliments')
        .select('*');

      if (error) {
        console.error('Error fetching aliments:', error);
        return [];
      }

      const foods = await Promise.all(
        (aliments || []).map(aliment => mapAlimentToFood(aliment as AlimentFromDB))
      );

      console.log(`Fetched ${foods.length} foods from Supabase`);
      return foods;
    }
  });
};

export const useAliment = (id: string) => {
  return useQuery({
    queryKey: ['aliments', id],
    queryFn: async () => {
      const { data: aliment, error } = await supabase
        .from('aliments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching aliment:', error);
        return null;
      }

      return mapAlimentToFood(aliment as AlimentFromDB);
    }
  });
};
