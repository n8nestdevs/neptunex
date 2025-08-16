import React from 'react';

type Props = React.SVGProps<SVGSVGElement>;

const LogoNeptunex: React.FC<Props> = ({ className, ...rest }) => {
  // Usa currentColor para heredar el color de Tailwind (p.ej. text-teal-400)
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {/* Círculo/escudo */}
      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      {/* Tridente */}
      <path
        d="M32 10l6 6-4 0 0 14h4l-6 10-6-10h4V16l-4 0 6-6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Ola inferior */}
      <path
        d="M14 46c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 8 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
};

export default LogoNeptunex;