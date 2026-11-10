// Un solo lugar para decidir qué rol ve qué página.
// Para dar o quitar acceso, solo edita la lista "roles" de cada ruta.
export const PAGINAS = [
  {
    ruta: "/",
    texto: "Menu",
    roles: ["admin1", "admin2", "admin3"],
  },
  {
    ruta: "/menu2",
    texto: "Menu2",
    roles: ["admin1", "admin3"],
  },
  {
    ruta: "/menu3",
    texto: "Menu3",
    roles: ["admin1", "admin2"],
  },
  {
    ruta: "/menu4",
    texto: "Menu4",
    roles: ["admin1", "admin2"],
  },
];

export function puedeVer(rol, ruta) {
  const pagina = PAGINAS.find((p) => p.ruta === ruta);
  return pagina ? pagina.roles.includes(rol) : false;
}
