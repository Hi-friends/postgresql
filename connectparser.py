import pandas as pd
import psycopg2 as pg2
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres@18.191.153.227:5432/postgres')


df = pd.DataFrame()

df = df.append(pd.read_html('https://finance.naver.com/marketindex/exchangeList.nhn', header=0)[0], ignore_index = True)
df = df.rename(columns = {'통화명' : '통화명', '매매기준율' : '매매기준율', '현찰' : '현찰-사실 때', '송금' : '현찰-파실 때', '미화환산율' : '송금-보내실 때', 'Unnamed: 5' : '송금-받으실 때', 'Unnamed: 6' : '미화환산율'})
df = df.dropna()

df.to_sql('postgres', engine, if_exists='replace')
a = pd.read_sql_query('select * from postgres', con=engine)




print("========== MENU ==========")
print("1.미국(USD) 2.유럽연합(EUR) 3.일본(JPY)")
print("4.중국(CNY) 5.홍콩(HKD) 6.대만(TWD)")
print("7.영국(GBP) 8.오만(OMR) 9.캐나다(CAD)")
print("10.스위스(CHF) 11.스웨덴(SEK) 12.호주(AUD)")
print("13.뉴질랜드(NZD) 14.체코(CZK) 15.칠레(CLP)")
print("16.터키(TRY) 17.몽골(MNT) 18.이스라엘(ILS)")
print("19.덴마크(DKK) 20.노르웨이(NOK) 21.사우디아라비아(SAR)")
print("22.쿠웨이트(KWD) 23.바레인(BHD) 24.아랍에미리트(AED)")
print("25.요르단(JOD) 26.이집트(EGP) 27.태국(THB)")
print("28.싱가포르(SGD) 29.말레이시아(MYR) 30.인도네시아(IDR 100)")
print("31.카타르(QAR) 32.카자흐스탄(KZT) 33.브루나이(BND)")
print("34.인도(INR) 35.파키스탄(PKR) 36.방글라데시(BDT)")
print("37.필리핀(PHP) 38.멕시코(MXN) 39.브라질(BRL)")
print("40.베트남(VND 100) 41.남아프리카 공화국(ZAR) 42.러시아(RUB)")
print("43.헝가리(HUF) 44.폴란드(PLN)")
print("==========================\n")

nation = int(input("Q1. 찾아보고자 하는 국가의 번호를 입력하시오.\n"))

print("========= MENU(2) ========")
print("1. 매매기준율 2.현찰(살 때) 3.현찰(팔 때)")
print("4. 송금(보낼 때) 5.송금(받을 때) 6. 미화환산율")
print("==========================\n")

want_menu = int(input("Q2. 진행하고자 하는 과정의 번호를 입력하시오.\n"))


print(df.ix[nation, want_menu])


