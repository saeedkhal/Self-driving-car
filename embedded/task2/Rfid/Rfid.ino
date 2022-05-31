#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
void setup()
{
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522

}
void loop()
{
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent())
  {
    Serial.println("No uuid");
    delay(5000);
    return;
  }
  // Select one of the cards
  if ( mfrc522.PICC_ReadCardSerial())
  {
    //Show UID on serial monitor
    String content = "";
    byte letter;
    for (byte i = 0; i < mfrc522.uid.size; i++)
    {
      content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
      content.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    content.toUpperCase();
    Serial.println(content.substring(1));
    // Look for new cards
    if ( ! mfrc522.PICC_IsNewCardPresent())
    {
      delay(1000);
      return;
    }
    delay (1000);
  }


}
