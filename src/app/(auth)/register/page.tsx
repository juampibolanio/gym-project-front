'use client'
import { Mail, Lock, EyeOff, Eye, Dumbbell, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
    const [nombreCompleto, setNombreCompleto] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [nombreGimnasio, setNombreGimnasio] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Registro:', { nombreCompleto, email, nombreGimnasio, password })
    }

    return (
        <div className="w-full max-w-[400px] flex flex-col items-center">
            
            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center mb-4">
                    <Dumbbell className="text-emerald-500" size={24} />
                </div>
                <h1 className="text-xl font-bold text-zinc-100">GymSystem</h1>
                <p className="text-sm text-zinc-400 mt-1">Terminal de Registro Administradores</p>
            </div>

            <div className="w-full bg-[#18181b] border-t-2 border-t-emerald-600 border border-zinc-800 rounded-lg p-6 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                            Nombre Completo
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-3 text-zinc-500" size={16} />
                            <input 
                                type="text"
                                value={nombreCompleto}
                                onChange={(e) => setNombreCompleto(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full bg-[#131313] border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                            Email de Trabajo
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-zinc-500" size={16} />
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@gymname.com"
                                className="w-full bg-[#131313] border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                            Nombre del Gimnasio
                        </label>
                        <div className="relative flex items-center">
                            <Dumbbell className="absolute left-3 text-zinc-500" size={16} />
                            <input 
                                type="text"
                                value={nombreGimnasio}
                                onChange={(e) => setNombreGimnasio(e.target.value)}
                                placeholder="Iron Works Arena"
                                className="w-full bg-[#131313] border border-zinc-800 rounded-md py-2.5 pl-10 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                            Contraseña
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 text-zinc-500" size={16} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#131313] border border-zinc-800 rounded-md py-2.5 pl-10 pr-10 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                            >
                                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[#2d5f43] hover:bg-[#244f36] text-zinc-100 font-medium text-sm py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        Crear Cuenta <span className="text-lg leading-none">→</span>
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
                    Ya tienes una cuenta?{' '}
                    <Link href="/login" className="ml-1 text-zinc-300 hover:text-white transition-colors">
                        Inicia Sesión
                    </Link>
                </div>
            </div>

        </div>
    );
}
