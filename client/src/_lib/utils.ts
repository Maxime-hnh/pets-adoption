export const calculateAgeToString = (birthDate: Date, onlyYears: boolean = false) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  switch (true) {
    case years === 0:
      return `${months} mois`;
    case months === 0:
      return `${years} an${years > 1 ? 's' : ''}`;
    default:
      if (onlyYears) {
        return `${years} an${years > 1 ? 's' : ''}`;
      }
      return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
  }
};

export const calculateAgeToNumber = (birthDate: string | Date): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function formatDate(value: Date | string): string {
  const date = new Date(value)
  return new Intl.DateTimeFormat(
    'fr-FR',
    {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).format(date)

}