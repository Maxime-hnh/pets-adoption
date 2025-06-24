import React from 'react';
import { cn } from '@/_lib/cn';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  // Critères de validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^\w\s]/.test(password);

  // Vérifier si tous les critères requis sont satisfaits
  const allRequiredCriteriaMet = hasMinLength && hasUppercase && hasNumber && hasSpecialChar;

  // Calcul du score basé uniquement sur les critères requis
  const validCriteria = [hasMinLength, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;

  // Détermination de la couleur et du texte en fonction du score
  const getColorAndText = () => {
    // Si le mot de passe est vide
    if (password.length === 0 || validCriteria === 0) return { color: 'bg-gray-200', text: 'Vide', width: '0%' };


    // Évaluation basée sur le nombre de critères satisfaits
    if (validCriteria === 1) return { color: 'bg-red-500', text: 'Très faible', width: '25%' };
    if (validCriteria === 2) return { color: 'bg-orange-500', text: 'Faible', width: '50%' };
    if (validCriteria === 3) return { color: 'bg-yellow-500', text: 'Moyen', width: '75%' };

    // Ne retourne "Fort" que si tous les critères requis sont satisfaits
    if (allRequiredCriteriaMet) return { color: 'bg-green-500', text: 'Fort', width: '100%' };

    // Si 4 critères sont satisfaits mais pas tous les requis (cas impossible en principe)
    return { color: 'bg-yellow-500', text: 'Moyen', width: '75%' };
  };

  const { color, text, width } = getColorAndText();

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs">
        <span>Force du mot de passe: {text}</span>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-700 ease-in-out", color)}
          style={{ width }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className={cn("w-3 h-3 rounded-full", hasMinLength ? "bg-green-500" : "bg-gray-300")} />
          <span>8 caractères minimum</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("w-3 h-3 rounded-full", hasUppercase ? "bg-green-500" : "bg-gray-300")} />
          <span>Une majuscule</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("w-3 h-3 rounded-full", hasNumber ? "bg-green-500" : "bg-gray-300")} />
          <span>Un chiffre</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={cn("w-3 h-3 rounded-full", hasSpecialChar ? "bg-green-500" : "bg-gray-300")} />
          <span>Un caractère spécial</span>
        </div>
      </div>
    </div>
  );
}
