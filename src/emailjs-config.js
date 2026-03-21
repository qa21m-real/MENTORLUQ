const PLACEHOLDER_PREFIX = "YOUR_EMAILJS_";

export const EMAILJS_CONFIG = {
  publicKey: "5pDB04zLZYdltpps4",
  serviceId: "service_g3r2j6d",
  templateId: "template_t6e4cfl",
  destinationEmail: "qasimilyasov.21@gmail.com"
};

export function hasEmailJsConfig(config = EMAILJS_CONFIG) {
  return ["publicKey", "serviceId", "templateId"].every((key) => {
    const value = String(config[key] || "").trim();
    return value && !value.startsWith(PLACEHOLDER_PREFIX);
  });
}
