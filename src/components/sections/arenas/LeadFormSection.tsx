"use client";

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  User,
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
} from "../../../lib/libraries";
import { getTranslation } from "../../../lib/i18n";
import { DynamicIcon } from "../../elements/DynamicIcon";
import type { SectionPartners } from "../../../types/strapi.arena.model";

interface LeadFormSectionProps {
  data: SectionPartners;
  language: string;
}

export default function LeadFormSection({ data, language }: LeadFormSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    email: '',
    telefone: ''
  });

  if (!data) return null;

  const badge = getTranslation(data.tooltip, language);
  const title = getTranslation(data.title, language);
  const description = getTranslation(data.subtitle || undefined, language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio para o email
    // Em um cenário real, você chamaria uma Server Action aqui
    console.log('Dados do Lead:', formData);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left Side: Content */}
          <div className="relative">
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {badge}
              </motion.div>
            )}

            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 italic uppercase tracking-tighter leading-[0.9]" style={{ transform: 'skewX(-3deg)' }}>
              {title}
            </h2>

            {description && (
              <p className="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed mb-12 max-w-xl">
                {description}
              </p>
            )}

            {/* Features List from Strapi */}
            <div className="space-y-6">
              {data.itens?.map((item, index) => (
                <div key={item.id || index} className="flex items-center gap-4 text-zinc-300">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shrink-0">
                    <DynamicIcon iconName={item.icon} fallback={CheckCircle2} size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg leading-tight uppercase">
                      {getTranslation(item.item, language)}
                    </p>
                    <p className="text-sm text-zinc-500 font-light mt-1">
                      {getTranslation(item.subitem, language)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Form Content */}
          <div className="relative">
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="nome" className="text-zinc-400 font-bold uppercase text-xs tracking-widest ml-1 block">Nome</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                          <input
                            id="nome"
                            type="text"
                            required
                            placeholder="Seu nome completo"
                            className="w-full bg-zinc-800/50 border border-white/5 h-14 pl-12 pr-4 rounded-xl text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none transition-all font-light"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="cidade" className="text-zinc-400 font-bold uppercase text-xs tracking-widest ml-1 block">Cidade</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                          <input
                            id="cidade"
                            type="text"
                            required
                            placeholder="Sua cidade / UF"
                            className="w-full bg-zinc-800/50 border border-white/5 h-14 pl-12 pr-4 rounded-xl text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none transition-all font-light"
                            value={formData.cidade}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-zinc-400 font-bold uppercase text-xs tracking-widest ml-1 block">E-mail Corporativo</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="seu@email.com"
                          className="w-full bg-zinc-800/50 border border-white/5 h-14 pl-12 pr-4 rounded-xl text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none transition-all font-light"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="telefone" className="text-zinc-400 font-bold uppercase text-xs tracking-widest ml-1 block">Telefone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                        <input
                          id="telefone"
                          type="text"
                          required
                          placeholder="(00) 00000-0000"
                          className="w-full bg-zinc-800/50 border border-white/5 h-14 pl-12 pr-4 rounded-xl text-white placeholder:text-zinc-600 focus:border-primary/50 focus:outline-none transition-all font-light"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-primary hover:bg-primary/90 text-black font-black text-lg uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(148,206,0,0.2)] hover:shadow-[0_0_50px_rgba(148,206,0,0.4)] group italic flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ transform: 'skewX(-2deg)' }}
                    >
                      {isSubmitting ? 'Enviando...' : 'Tornar-se parceiro'}
                      {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>

                    <p className="text-center text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
                      Ao enviar, você concorda com nossos termos de privacidade.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary mb-4">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">Recebemos seu contato!</h3>
                    <p className="text-zinc-400 text-lg max-w-sm font-light">
                      Em breve um de nossos consultores entrará em contato para transformar sua arena.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="border border-white/10 text-white hover:bg-white hover:text-black transition-colors font-bold h-12 px-8 rounded-full"
                    >
                      Enviar outro contato
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
