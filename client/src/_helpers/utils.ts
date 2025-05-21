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