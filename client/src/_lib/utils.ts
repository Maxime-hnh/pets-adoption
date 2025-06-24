export const calculateAge = (birthDate: Date) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return `${months} mois`;
  } else if (months === 0) {
    return `${years} an${years > 1 ? 's' : ''}`;
  } else {
    return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
  }
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