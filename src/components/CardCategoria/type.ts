import { Categoria } from "../../data/Categoria/type";

export interface CardCategoriaProps {
  item: Categoria;
  selecionado: boolean;
  onPress: () => void;
}