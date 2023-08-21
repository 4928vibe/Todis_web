import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FONT from '../../styles/Font';
import { ReactComponent as CodiCheck } from '../../assets/icon/CodiCheck.svg';
import { ReactComponent as CodiUnCheck } from '../../assets/icon/CodiUnCheck.svg';

type CheckProps = {
  isChecked: boolean;
  text: string;
};

type CodiBoxData = {
  id: number;
  text: string;
  isChecked: boolean;
};

const CodiPoint = () => {
  const [coditexts, setCoditexts] = useState<CodiBoxData[]>([
    {
      id: 1,
      text: 'Loading..',
      isChecked: false
    },
    {
      id: 2,
      text: 'Loading..',
      isChecked: false
    },
    {
      id: 3,
      text: 'Loading..',
      isChecked: false
    }
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        try {
          const [weatherResponse, airQualityResponse, uviResponse] =
            await Promise.all([
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
              ),
              fetch(
                `http://api.openweathermap.org/data/2.5/air_pollution?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98&lang=kr`
              ),
              fetch(
                `http://api.openweathermap.org/data/2.5/uvi?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=4d4c41dc06bbf1741b3a628d64934b98`
              )
            ]);

          if (
            !weatherResponse.ok ||
            !airQualityResponse.ok ||
            !uviResponse.ok
          ) {
            throw new Error('One or more API responses were not ok');
          }

          const weatherData = await weatherResponse.json();
          const airQualityData = await airQualityResponse.json();
          const uviData = await uviResponse.json();

          const temp = weatherData.main.temp; // 기온
          const humidity = weatherData.main.humidity; // 습도
          const forecastData = weatherData.weather[0].main; // Rain, Snow
          const airQuality = airQualityData.list[0].main.aqi; // 대기질
          const uvi = uviData.value; // 자외선
          console.log(
            '기온: ',
            temp,
            '습도: ',
            humidity,
            '예측: ',
            forecastData,
            '대기질: ',
            airQuality,
            '자외선: ',
            uvi
          );

          // 코디문구
          const TempRanges = [
            {
              min: -Infinity,
              max: 4,
              text: [
                '날씨가 많이 추우니 패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리 등을 입어 체온을 유지해 주세요!'
              ]
            },
            {
              min: 5,
              max: 8,
              text: [
                '가을에서 겨울로 넘어가는 시기이기 때문에 제법 추워요..!\n따라서 겨울 코트나 가죽 옷, 두툼한 울 소재의 아우터 정도를 입으면 좋을 것 같아요!',
                '추위를 많이 타시는 분이라면 히트텍이나 내복을 입어 체온 유지를 하셔도 좋습니다 :)'
              ]
            },
            {
              min: 9,
              max: 11,
              text: [
                '이 날씨가 아니면 트렌치코트를 입기 힘들기에 트렌치코트나 야상, 점퍼를 입는 것을 추천드려요!\n하의는 기모 바지를 추천합니다 :)'
              ]
            },
            {
              min: 12,
              max: 16,
              text: [
                '일교차가 더욱 커지는 시기이므로 여려 옷을 겹쳐 입어 기온과 장소에 맞게 입고 벗는 것이 중요할 것 같아요.\n자켓, 가디건, 청자켓, 니트. 청바지 추천드려요!'
              ]
            },
            {
              min: 17,
              max: 19,
              text: [
                '17도에서 19도 사이의 경우 대부분의 옷을 입을 수 있는 온도예요!\n상의는 두꺼운 소재만 아니라면 가디건이나 니트, 맨투맨, 후드 등 다 추천드려요!'
              ]
            },
            {
              min: 20,
              max: 22,
              text: [
                '일교차가 클 수 있어, 안에는 얇게 입으시고 겉에는 가벼운 외투를 걸쳐주시면 좋을 것 같아요!\nex. 얇은 소재의 가디건, 셔츠, 바람막이 혹은 긴팔이나 맨투맨, 블라우스',
                '하의의 경우 기본 슬랙스나 청바지, 면바지 모두 입기 괜찮아요 :)'
              ]
            },
            {
              min: 23,
              max: 27,
              text: [
                '23도에서 27도 사이의 날씨는 한여름은 아니지만 그래도 더운 날씨로 반팔이나 얇은 셔츠, 반바지,\n면바지를 추천할게요!',
                '두번째문구'
              ]
            },
            {
              min: 28,
              max: Infinity,
              text: [
                '한여름 날씨로 최대한 얇고 가볍게 입는 것이 좋아요!\n민소매 혹은 반팔, 반바지를 추천드리고 리넨 소재의 옷이 좋을 것 같아요 :)',
                '이렇게 더운 날일수록 실내에서는 에어컨을 강하게 틀기도 하니 추위를 많이 타시는 분의 경우 얇은 가디건을 챙기시는 것도 추천드려요!'
              ]
            }
          ];
          const UviTextData = [
            '검은색은 자외선을 흡수하면서 열도 함께 흡수해 옷이 뜨거워지므로 검은색 옷은 피하는 것이 좋습니다!',
            '헐렁한 옷이 몸에 딱 맞는 옷보다 자외선 보호 효과가 크므로 헐렁한 옷을 추천드려요!\n몸에 딱 맞는 옷을 입었을 때는 옷감 사이로 빛이 통과할 수 있기 때문이에요 :('
          ];
          const AirTextData = [
            '대기질 수치가 ‘나쁨’이에요\n:( 긴 소매의 옷을 추천합니다!',
            '마스크를 고를 때 식품의약품안전처의 인증을 받았는지 확인해 보세요!\n식약처에 의약외품으로 허가한 보건용 마스크에는 ‘KF+숫자’표시가 붙어 있어요.\nKF 뒤에 오는 숫자가 높을수록 차단 효과가 크지만 호흡에 불편함을 느낄 수 있으므로, 본인의 호흡량과 황사, 미세먼지 발생 수준 등을 고려해 적당한 제품을 선택하는 것이 바람직합니다.',
            '대기질 수치는 ‘보통’이에요! 일부 오염 물질의 경우 공기 오염에 민감한 소수의 사람들에게는 건강상 안 좋은 영향을 끼칠 수 있으니 마스크 챙기는 것을 권장 드릴게요!'
          ];
          const ForecastData = [
            '여름철 장마에는 꿉꿉함을 없애기 위해서 실내에는 에어컨을 틀어 놓는 경우가 많은데요.\n이로 인해 쌀쌀함을 느낄 수 있으니 가디건이나 남방을 챙겨서 아우터로 입기 바라요!',
            '비로 인해 신발이 젖었다면, 헤어드라이기로 말린 뒤 신발 속에 신문지를 넣어 보관하면 습기와 냄새 제거는 물론 형태도 바로잡아주니 참고해 주세요 :)',
            '오늘 비가 내린다고 했어요!\n스웨이드 재질의 신발은 피해주시고 레인부츠를 신는 것을 추천드려요!',
            '하의는 반바지 혹은 어두운색의 긴 바지를 추천해요!\n바지가 비에 젖을 수 있으니 밝은 회색, 하늘 계열의 색은 추천하지 않아요 :(',
            '눈밭에서 방수가 어느 정도 되고 발도 따뜻하게 해주는\n부츠를 신는 것을 추천해요!',
            '눈이 많이 오면 머리나 옷이 젖을 수 있으니,\n우산을 챙기는 게 좋을 것 같아요!'
          ];
          const HumidityData = [
            '섬유에 따라 습기에 강하거나 약한 재질이 있는데요.\n습기에 강한 면 종류를 맨 아래에 두고 습기에 약한 합성섬유나 실크는 위에 두어 옷감이 상하지 않도록 예방하는 것이 좋습니다!',
            '신문지와 숯은 옷 주변 습기를 흡수하기에\n이를 이용해 옷의 뽀송함을 유지하는 것도 좋아요 :)'
          ];
          let FirstText = '';
          let SecondText = '';
          let ThirdText = '';
          // 1. 기온
          for (const range of TempRanges) {
            if (temp >= range.min && temp <= range.max) {
              const randomIndex = Math.floor(Math.random() * range.text.length);
              FirstText = range.text[randomIndex];
              break;
            }
          }
          // 2. 습도, Rain, Snow
          if (
            humidity >= 50 ||
            forecastData === 'Rain' ||
            forecastData === 'Snow'
          ) {
            const randomHumIndex = Math.floor(
              Math.random() * HumidityData.length
            );
            const randomRainIndex = Math.floor(Math.random() * 4);
            const randomSnowIndex = Math.floor(Math.random() * 2) + 4;
            SecondText =
              humidity >= 50
                ? HumidityData[randomHumIndex]
                : forecastData === 'Rain'
                ? ForecastData[randomRainIndex]
                : ForecastData[randomSnowIndex];
          }
          // 3. 자외선, 대기질
          if (uvi >= 6 || airQuality >= 150) {
            const randomUviIndex = Math.floor(
              Math.random() * UviTextData.length
            );
            const randomAirIndex = Math.floor(Math.random() * 2);
            ThirdText =
              uvi >= 6
                ? UviTextData[randomUviIndex]
                : AirTextData[randomAirIndex];
          } else {
            ThirdText = AirTextData[2];
          }

          setCoditexts((prevCoditexts) => [
            {
              id: 1,
              text: FirstText,
              isChecked: false
            },
            {
              id: 2,
              text: SecondText,
              isChecked: false
            },
            {
              id: 3,
              text: ThirdText,
              isChecked: false
            }
          ]);
        } catch (error) {
          console.error(error);
        }
      },
      function (error) {
        console.error(error);
      }
    );
  }, []);

  const CodiCheckHandler = (id: number) => {
    setCoditexts((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
      return updatedData;
    });
  };

  return (
    <div>
      {coditexts.map((item) => (
        <CodiBox
          key={item.id}
          style={FONT.L3}
          isChecked={item.isChecked}
          text={item.text}
        >
          {item.text}
          <CheckBtn
            onClick={() => CodiCheckHandler(item.id)}
            isChecked={item.isChecked}
          >
            {item.isChecked ? <CodiCheck /> : <CodiUnCheck />}
          </CheckBtn>
        </CodiBox>
      ))}
    </div>
  );
};

export default CodiPoint;

const CodiBox = styled.div<CheckProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.isChecked ? props.theme.Blue_Main : 'white'};
  color: ${(props) => (props.isChecked ? 'white' : props.theme.Gray_00)};
  letter-spacing: -0.41px;
  border: 2px solid ${(props) => props.theme.Blue_Main};
  border-radius: 40px;
  padding: ${(props) =>
    props.text === 'Loading..' ? '40px 42px 30px 92px' : '30px 42px 30px 92px'};
  margin-bottom: 10px;
  width: 100vw;
  max-width: 531px;
  min-height: 130px;
  white-space: pre-line;
`;

const CheckBtn = styled.button<Pick<CheckProps, 'isChecked'>>`
  position: absolute;
  top: 37px;
  left: 25px;
  background-color: white;
  border-radius: 50px;
  border: ${(props) =>
    props.isChecked ? 'none' : '2px dashed ' + props.theme.Gray_02};
  width: 48px;
  height: 48px;
  cursor: pointer;
`;
