
/**
 * Shared brand mark used across the admin area (sidebar, login, forms, header).
 * The logo file itself is never modified — only its presentation/sizing here.
 */
const sizes = {
  sm: { img: "h-8 w-8", text: "text-sm" },
  md: { img: "h-11 w-11", text: "text-base" },
  lg: { img: "h-16 w-16", text: "text-xl" },
  xl: { img: "h-24 w-24", text: "text-3xl" },
};

const Brand = ({ size = "md", variant = "dark", withText = true, className = "" }) => {
  const s = sizes[size] || sizes.md;
  const textColor = variant === "light" ? "text-zinc-900" : "text-white";
  const subColor = variant === "light" ? "text-zinc-500" : "text-zinc-400";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Sereine De Femme"
        className={`${s.img} object-contain rounded-lg shrink-0`}
      />
      {withText && (
        <div className="leading-tight">
          <div className={`font-brand-serif font-semibold tracking-wide ${s.text} ${textColor}`}>
            Sereine De Femme
          </div>
          <div className={`text-[10px] uppercase tracking-[0.25em] ${subColor}`}>
            Admin Suite
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;
