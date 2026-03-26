// "use client";

// import type { FormEvent } from "react";

// export type InputProps = {
//   placeholder?: string;
//   type?: "text" | "email" | "password" | "number";
//   numberVariant?: "integer" | "decimal";
// };

// function InputIcon({ type }: { type: InputProps["type"] }) {
//   if (type === "email") {
//     return (
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 24 24"
//         className="h-4 w-4 text-slate-400"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <rect x="3" y="5" width="18" height="14" rx="2" />
//         <path d="m4 7 8 6 8-6" />
//       </svg>
//     );
//   }

//   if (type === "password") {
//     return (
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 24 24"
//         className="h-4 w-4 text-slate-400"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <rect x="4" y="11" width="16" height="9" rx="2" />
//         <path d="M8 11V8a4 4 0 1 1 8 0v3" />
//       </svg>
//     );
//   }

//   return null;
// }

// export default function Input({
//   placeholder = "Wpisz cos...",
//   type = "text",
//   numberVariant = "integer",
// }: InputProps) {
//   const hasIcon = type === "email" || type === "password";
//   const wrapperWidthClassName = type === "number" ? "w-[35%]" : "w-[70%]";
//   const inputType =
//     type === "number" && numberVariant === "integer" ? "text" : type;
//   const numberProps =
//     type === "number"
//       ? numberVariant === "decimal"
//         ? { step: "0.01", inputMode: "decimal" as const }
//         : { inputMode: "numeric" as const, pattern: "[0-9]*" }
//       : {};
//   const handleIntegerInput =
//     type === "number" && numberVariant === "integer"
//       ? (event: FormEvent<HTMLInputElement>) => {
//           event.currentTarget.value = event.currentTarget.value.replace(
//             /\D+/g,
//             "",
//           );
//         }
//       : undefined;

//   return (
//     <div className={`relative ${wrapperWidthClassName}`}>
//       {hasIcon ? (
//         <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
//           <InputIcon type={type} />
//         </span>
//       ) : null}
//       <input
//         type={inputType}
//         placeholder={placeholder}
//         className={`w-full rounded-lg border border-gray-300 bg-white py-1 outline-none transition focus:border-blue-600 ${
//           hasIcon ? "pl-10 pr-3" : "px-2"
//         }`}
//         onInput={handleIntegerInput}
//         {...numberProps}
//       />
//     </div>
//   );
// }

"use client";

import type { FormEvent } from "react";

export type InputProps = {
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  numberVariant?: "integer" | "decimal";
  className?: string;
};

function InputIcon({ type }: { type: InputProps["type"] }) {
  if (type === "email") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "password") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-slate-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </svg>
    );
  }

  return null;
}

export default function Input({
  placeholder = "Wpisz co\u015b...",
  type = "text",
  numberVariant = "integer",
  className = "",
}: InputProps) {
  const hasIcon = type === "email" || type === "password";

  const inputType =
    type === "number" && numberVariant === "integer" ? "text" : type;

  const numberProps =
    type === "number"
      ? numberVariant === "decimal"
        ? { step: "0.01", inputMode: "decimal" as const }
        : { inputMode: "numeric" as const, pattern: "[0-9]*" }
      : {};

  const handleIntegerInput =
    type === "number" && numberVariant === "integer"
      ? (event: FormEvent<HTMLInputElement>) => {
          event.currentTarget.value = event.currentTarget.value.replace(
            /\D+/g,
            "",
          );
        }
      : undefined;

  return (
    <div className={`relative w-full ${className}`}>
      {hasIcon ? (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <InputIcon type={type} />
        </span>
      ) : null}

      <input
        type={inputType}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 bg-white py-2 outline-none transition focus:border-blue-600 ${
          hasIcon ? "pl-10 pr-3" : "px-3"
        }`}
        onInput={handleIntegerInput}
        {...numberProps}
      />
    </div>
  );
}
