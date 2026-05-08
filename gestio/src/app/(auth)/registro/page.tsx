"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    // Paso 1: Crear usuario en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setCargando(false);
      return;
    }

    if (password.length < 8){
      setError("La contraseña debe tener almenos 8 caracteres");
      return;
    }

    // Paso 2: Guardar perfil en tu tabla profiles
    if (data.user) {
      const { error: dbError } = await supabase.from("profiles").insert([{
        user_id: data.user.id,
        nombre,
        empresa,
        telefono,
        plan: "free",
      }]);

      if (dbError) {
        setError(dbError.message);
        setCargando(false);
        return;
      }
    }

    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </label>
      <br />
      <label>
        Empresa:
        <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </label>
      <br />
      <label htmlFor="">
        Correo:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      </label>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={cargando}>
        {cargando ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}