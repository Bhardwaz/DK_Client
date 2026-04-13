import { useMemo } from "react";

export const getRelativeTime = (date) => {
  if (!date) return "";
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffMs = now - past;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMinutes > 0)
    return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  return "just now";
};

// chat compo utilities fn

// 1. storing user with we are chatting in localstorage
export function useLocalStorage(status, chats, connectionWithOutChat, targetUserId) {
  return useMemo(() => {
    let user;
    if (status === "active") {
      user = chats?.find(
        (chat) => chat?.otherUser._id === targetUserId
      )?.otherUser;
    } else {
      user = connectionWithOutChat?.find(
        (conn) => conn?.user?._id === targetUserId
      )?.user;
    }
    if (user) {
      localStorage.setItem("targetUserInfo", JSON.stringify(user));
    }
    return user;
  }, [chats, targetUserId, connectionWithOutChat, status]);
}

 // 🔹 Calculate age from birthday
export const calculateAge = (birthday) => {
    if (!birthday) return null;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  
  // validate signup input datas
  export const validateSignUpData = (formData) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Min 6 characters required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (formData.interestIn.length === 0)
      newErrors.interestIn = "Select at least one option";
    if (!formData.birthday) newErrors.birthday = "Birthday is required";
    if (!formData.desiredAgeRange.min || isNaN(formData.desiredAgeRange.min))
      newErrors.desiredAgeMin = "Min age must be a number";
    if (!formData.desiredAgeRange.max || isNaN(formData.desiredAgeRange.max))
      newErrors.desiredAgeMax = "Max age must be a number";
    if(formData.desiredAgeRange.min < 18)
      newErrors.desiredAgeMin = "Min age must be above 18";
     if(formData.desiredAgeRange.max > 50)
      newErrors.desiredAgeMax = "Max age must be lower than 50";

    return newErrors
  }
