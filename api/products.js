const products = [
  { id: 1, name: "Mouse Nirkabel", price: 75000, icon: "M", tag: "Aksesori" },
  { id: 2, name: "Papan Ketik", price: 150000, icon: "K", tag: "Perangkat" },
  { id: 3, name: "Lampu Meja", price: 90000, icon: "L", tag: "Perlengkapan" },
  { id: 4, name: "Dudukan Laptop", price: 120000, icon: "D", tag: "Aksesori" },
];

export default function handler(_request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.status(200).send(JSON.stringify(products));
}
