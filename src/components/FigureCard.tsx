import Image from 'next/image';

type FigureCardProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function FigureCard({ src, alt, caption, width = 1200, height = 800 }: FigureCardProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Image src={src} alt={alt} width={width} height={height} className="block h-auto w-full" />
      {caption && (
        <figcaption className="border-t border-slate-200 px-4 py-2 text-sm text-slate-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default FigureCard;
