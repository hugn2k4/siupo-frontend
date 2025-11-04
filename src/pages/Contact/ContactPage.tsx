import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Container, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ContactImage from "../../assets/images/defaults/image_restaurant_exterior.png";
import { useTranslation } from "../../hooks/useTranslation";

function ContactPage() {
  const { t } = useTranslation("contact");

  const contactInfo = [
    {
      icon: LocationOnIcon,
      title: t("info.address"),
      content: t("info.addressContent"),
    },
    {
      icon: PhoneIcon,
      title: t("info.phone"),
      content: t("info.phoneContent"),
    },
    {
      icon: EmailIcon,
      title: t("info.email"),
      content: t("info.emailContent"),
    },
    {
      icon: AccessTimeIcon,
      title: t("info.hours"),
      content: t("info.hoursContent"),
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          sx={{ textAlign: "center", mb: { xs: 8, lg: 12 } }}
        >
          <Typography
            sx={{
              fontFamily: "Miniver",
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "#FF9F0D",
              mb: 1,
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 3, sm: 4, lg: 6 },
          }}
        >
          {/* Row 1: Contact Info + Restaurant Image */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            sx={{ mb: { xs: 8, lg: 10 } }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Contact Info Cards */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    color: "#1E1E1E",
                    mb: 4,
                  }}
                >
                  {t("info.title")}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {contactInfo.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        gap: 2.5,
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor: "#F9F9F9",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#FFF8F0",
                          transform: "translateX(8px)",
                          boxShadow: "0 4px 12px rgba(255,159,13,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          minWidth: 48,
                          borderRadius: "50%",
                          backgroundColor: "#FF9F0D",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <item.icon sx={{ fontSize: "1.5rem", color: "white" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            mb: 0.5,
                            color: "#1E1E1E",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "#4F4F4F",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Restaurant Image */}
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  height: { xs: "300px", lg: "100%" },
                }}
              >
                <Box
                  component="img"
                  src={ContactImage}
                  alt="Restaurant Contact"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </div>
          </Box>

          {/* Row 2: Map + Contact Form */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Map */}
              <Box>
                <Box
                  sx={{
                    height: { xs: "400px", lg: "600px" },
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <iframe
                    title="Địa chỉ: 1 Võ Văn Ngân, Thủ Đức"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1378.5199971292775!2d106.77277534863916!3d10.851361093229496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752774d7ef06ef%3A0xe1f3dda94d3fde26!2zc-G7kSAxIMSQLiBWw7UgVsSDbiBOZ8OibiwgTGluaCBDaGnhu4N1LCBUaOG7pyDEkOG7qWMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e1!3m2!1svi!2s!4v1764062209484!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Box>

              {/* Contact Form */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: { xs: "1.75rem", md: "2rem" },
                    fontWeight: 700,
                    color: "#1E1E1E",
                    mb: 4,
                  }}
                >
                  {t("form.send")}
                </Typography>

                <Box component="form">
                  <TextField
                    placeholder={t("form.name")}
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                      },
                    }}
                  />

                  <TextField
                    placeholder={t("form.email")}
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                      },
                    }}
                  />

                  <TextField
                    placeholder={t("form.subject")}
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                      },
                    }}
                  />

                  <TextField
                    placeholder={t("form.message")}
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF9F0D",
                        },
                      },
                    }}
                  />

                  <button
                    type="submit"
                    className="
                      w-full py-4 px-8
                      bg-[#FF9F0D] text-white font-semibold text-lg
                      rounded-lg
                      transition-all duration-300
                      hover:bg-[#E68A00]
                      hover:shadow-[0_8px_20px_rgba(255,159,13,0.3)]
                      hover:-translate-y-1
                      active:scale-[0.98]
                    "
                  >
                    {t("form.send")}
                  </button>
                </Box>
              </Box>
            </div>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

export default ContactPage;
