import { LinearProgress, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error("Failed to fetch trending coins:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: 2.5,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontFamily: "Montserrat",
            p: "0 25px 15px 25px",
            textAlign: "justify",
          }}
        >
          {parse(coin?.description?.en?.split(". ")[0])}.
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            padding: "10px 25px",
            width: "100%",
            display: {
              md: "flex",
              sm: "flex",
              xs: "block",
            },
            justifyContent: {
              md: "space-around",
            },
            flexDirection: {
              sm: "column",
            },
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              display: "flex",
              marginBottom: 16,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex", marginBottom: 16 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price?.[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex", marginBottom: 16 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap?.[currency.toLowerCase()]
                  ?.toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
