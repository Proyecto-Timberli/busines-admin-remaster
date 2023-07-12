export function filterBy(array, search, atribute) {
    // 1 parametro array afiltrar
    // 2 parametro de busqueda
    // 3 parametro atributo a filtrar
      if (!array){return} 
      return array.filter(
      (e) =>
          e[atribute] && e[atribute].toLowerCase().includes(search.toLowerCase())
      );
  }