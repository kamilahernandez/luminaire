export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc marker:text-gold-600">
          {item}
        </li>
      ))}
    </ul>
  );
}
