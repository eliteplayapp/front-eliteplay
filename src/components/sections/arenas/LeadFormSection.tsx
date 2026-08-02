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
import { DynamicIcon } from "../../elements/DynamicIcon";
import { SectionBadge } from "../../elements/SectionBadge";
import { SectionHeading } from "../../elements/SectionHeading";
import { SectionContainer } from "../../elements/SectionContainer";
import { FormField } from "../../elements/FormField";
import { fadeInUp, scaleIn } from "../../../lib/animations";
import { toStr } from "../../../services/content.service";
import type { SectionPartners } from "../../../types/strapi.arena.model";

interface LeadFormSectionProps {
  data: SectionPartners;
}

export default function LeadFormSection({ data }: LeadFormSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    email: '',
    telefone: ''
  });

  if (!data) return null;

  const badge = toStr(data.tooltip);
  const title = toStr(data.title);
  const description = toStr(data.subtitle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio para o email
    console.log('Dados do Lead:', formData);
    
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <SectionContainer id="contact" className="bg-zinc-950 border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Left Side: Content */}
        <div className="relative">
          <SectionBadge text={badge} />
          <SectionHeading 
            title={title} 
            dark 
            className="mb-8" 
          />

          {description && (
            <p className="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed mb-12 max-w-xl">
              {description}
            </p>
          )}

          {/* Features List from Strapi */}
          <div className="space-y-6">
            {data.itens?.map((item: any, index: number) => (
              <motion.div 
                key={item.id || index} 
                className="flex items-center gap-4 text-zinc-300"
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-primary shrink-0">
                  <DynamicIcon iconName={item.icon} fallback={CheckCircle2} size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight uppercase">
                    {item.item}
                  </p>
                  <p className="text-sm text-zinc-500 font-light mt-1">
                    {item.subitem}
                  </p>
                </div>
              </motion.div>
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
                    <FormField 
                      id="nome" 
                      label="Nome" 
                      placeholder="Seu nome completo" 
                      required 
                      value={formData.nome} 
                      onChange={(val) => setFormData({ ...formData, nome: val })} 
                      icon={User} 
                    />
                    <FormField 
                      id="cidade" 
                      label="Cidade" 
                      placeholder="Sua cidade / UF" 
                      required 
                      value={formData.cidade} 
                      onChange={(val) => setFormData({ ...formData, cidade: val })} 
                      icon={MapPin} 
                    />
                  </div>

                  <FormField 
                    id="email" 
                    label="E-mail Corporativo" 
                    type="email"
                    placeholder="seu@email.com" 
                    required 
                    value={formData.email} 
                    onChange={(val) => setFormData({ ...formData, email: val })} 
                    icon={Mail} 
                  />

                  <FormField 
                    id="telefone" 
                    label="Telefone / WhatsApp" 
                    placeholder="(00) 00000-0000" 
                    required 
                    value={formData.telefone} 
                    onChange={(val) => setFormData({ ...formData, telefone: val })} 
                    icon={Phone} 
                  />

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
                  {...scaleIn}
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
    </SectionContainer>
  );
}

