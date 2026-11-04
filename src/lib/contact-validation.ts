export const contactTopics = [
  "Engineering opportunity",
  "Project collaboration",
  "Other",
] as const;

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
  website: string;
  startedAt: number;
};

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

export function validateContact(
  input: unknown,
  now = Date.now(),
): { data?: ContactMessage; errors: ContactErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { message: "Please complete the form." } };
  const value = input as Record<string, unknown>;
  const read = (key: string) =>
    typeof value[key] === "string" ? (value[key] as string).trim() : "";
  const data: ContactMessage = {
    name: read("name"),
    email: read("email"),
    topic: read("topic"),
    message: read("message"),
    website: read("website"),
    startedAt: typeof value.startedAt === "number" ? value.startedAt : 0,
  };
  const errors: ContactErrors = {};
  if (
    data.name.length < 2 ||
    data.name.length > 80 ||
    /[\u0000-\u001f\u007f]/.test(data.name)
  )
    errors.name = "Enter a name between 2 and 80 characters.";
  if (
    data.email.length > 254 ||
    !/^[^\s@<>\u0000-\u001f\u007f]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/.test(
      data.email,
    )
  )
    errors.email = "Enter a valid email address.";
  if (!(contactTopics as readonly string[]).includes(data.topic))
    errors.topic = "Choose a conversation topic.";
  if (
    data.message.length < 20 ||
    data.message.length > 4000 ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(data.message)
  )
    errors.message = "Write a message between 20 and 4,000 characters.";
  if (data.website) errors.website = "Unable to submit this message.";
  if (
    !Number.isFinite(data.startedAt) ||
    data.startedAt > now ||
    now - data.startedAt < 2000 ||
    now - data.startedAt > 86_400_000
  )
    errors.startedAt =
      "Please take a moment, then submit again. Refresh the page if this continues.";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
