"use client";
import { WandSparkles } from "lucide-react";
import { useState, useRef } from "react";

export function SettingsBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  // Detectar cualquier número con decimales (punto o coma)
  const regexDecimal = /^\d+[.,]\d*$/;
  // Detectar solo números enteros
  const regexInteger = /^[0-9]+$/;

  const validateInput = (val: string) => {
    setValue(val);

    if (val === "") {
      setError(null);
      return;
    }

    if (regexDecimal.test(val)) {
      setError("No se permiten decimales");
      return;
    }

    // 2️⃣ Luego comprobamos si son solo números enteros
    if (!regexInteger.test(val)) {
      setError("Solo se permiten números");
      return;
    }

    // 3️⃣ Si todo está bien
    setError(null);
  };

  const isButtonDisabled = !value || error !== null;

  return (
    <div className="w-full flex flex-col bg-white px-6 py-7 rounded-lg shadow">
      <p className="text-slate-800 font-semibold text-xl">Ajustes</p>

      <div className="flex flex-col mt-4">
        <p className="text-textGray">Numero de notas</p>

        <input
          ref={inputRef}
          type="text"
          onChange={(e) => validateInput(e.target.value)}
          placeholder="1. 2. 3."
          className={`h-10 rounded-lg border px-3 mt-1 focus:outline-none ${
            error
              ? "border-red-300 bg-red-100 mb-1"
              : "border-slate-300 bg-slate-100 mb-4"
          }`}
        />

        {error && <span className="text-red-500 text-sm mb-4">{error}</span>}

        <button
          onClick={() => console.log("hola")}
          className={`bg-indigo-500 flex justify-center items-center py-2 rounded-lg text-white font-semibold transition-color duration-200 ease-in-out ${
            error || isButtonDisabled
              ? " cursor-not-allowed"
              : "cursor-pointer hover:bg-indigo-600"
          }`}
          disabled={isButtonDisabled}
        >
          <WandSparkles className="w-5 h-5 stroke-2 mr-2" />
          Generar notas
        </button>
      </div>
    </div>
  );
}
