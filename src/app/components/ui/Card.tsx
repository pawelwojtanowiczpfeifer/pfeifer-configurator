export type CardProps = {
  title: string;
  text: string;
};

export default function Card({ title, text }: CardProps) {
  return (
    <div className="rounded-lg border border-sky-100 bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
