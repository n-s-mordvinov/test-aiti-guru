import type { JSX } from "react";
import { setSearchQuery, useSearchQuery } from "../../../entities/product"
import { InputField, SearchIcon } from "../../../shared/ui"

import styles from "./SearchProduct.module.scss";

interface SearchProductProps {
  className?: string;
}

export const SearchProduct = ({ className }: SearchProductProps): JSX.Element => {
  const searchQuery = useSearchQuery();

  return (
    <InputField
      placeholder="Найти"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onClear={() => setSearchQuery('')}
      renderBefore={<SearchIcon color="#999999" />}
      rootClassName={className}
      inputWrapperClassName={styles.inputWrapper}
    />
  )
}