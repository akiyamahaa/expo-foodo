import { StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "native-base";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "Policy">;

const Policy = (props: Props) => {
  const { navigation } = props;
  const handleBtnBack = () => {
    navigation.goBack();
  };
  return (
    <Box>
      <Header.BasicHeader
        title="Chính sách bảo mật"
        handleBtnBack={handleBtnBack}
      />
      <Box p={4}>
        <Text>
          Lorem ipsum dolor sit amet consectetur. Ornare augue ut volutpat
          pharetra vulputate habitasse faucibus nibh morbi. Amet auctor dictum
          nisi sagittis venenatis vitae pulvinar. Risus aliquet pellentesque
          mattis ac porttitor ultrices. Viverra ultrices leo fringilla mauris ut
          in. At urna enim dui elit pharetra at condimentum in. Maecenas a est
          risus ornare gravida nibh sed. Fermentum aliquam consequat ut enim sed
          eget pharetra bibendum placerat. Eget magna sed in auctor orci in
          elementum lobortis. Velit malesuada massa fermentum ullamcorper sit
          justo. At quisque congue ut porttitor mauris sed pharetra urna vitae.
          Eget neque non luctus placerat libero tellus. Tellus tortor sapien
          pellentesque aliquet mauris. Lacus viverra orci posuere in.
          Condimentum in porttitor et eget mattis lectus at at enim. Nisl
          adipiscing varius non sed euismod morbi sed. Donec phasellus enim
          molestie facilisis. Ornare cursus tellus dictum velit phasellus
          elementum. Quisque volutpat laoreet eget pharetra dignissim amet sed.
          Ullamcorper phasellus sed dapibus adipiscing quisque vulputate donec
          rutrum. Magna id ante interdum eu convallis nisi ac. At nibh et
          faucibus a libero ante feugiat amet mi. Fringilla mattis nunc
          scelerisque velit ac a tristique aliquet quisque. Pharetra purus
          hendrerit sit ipsum. Sed massa vitae sit amet diam amet euismod.
          Dictumst pellentesque ut molestie purus ultrices. Sagittis cursus
          vulputate viverra ullamcorper turpis. Aliquam dui mauris ac id. Magna
          lectus at mi phasellus. Sed blandit lectus sit bibendum amet mattis
          egestas. Vestibulum vitae est lacinia dolor nulla integer orci arcu
          neque. At sagittis sagittis enim scelerisque faucibus. Morbi vulputate
          scelerisque facilisi et in scelerisque pellentesque placerat. Id
          volutpat a mattis ultrices faucibus orci amet. Rutrum sed a
          sollicitudin arcu nullam. Faucibus gravida massa bibendum suspendisse
          diam nisl. Consectetur ac malesuada purus vitae a viverra scelerisque.
          Eros condimentum eu aliquam vestibulum sed sed. Libero habitasse erat
          pharetra sed elementum nam. At dui semper gravida a nibh tortor sem
          porta. Morbi euismod fringilla nulla adipiscing nisi tincidunt rutrum.
          Sed gravida nibh fames malesuada leo. Diam odio faucibus lacus
          adipiscing odio. Dignissim nulla ut massa sagittis amet. Sodales eget
          amet ullamcorper felis duis sit nunc magna amet. Faucibus duis
          consectetur id ac gravida. Sem amet dolor duis tincidunt id cras
          massa. Varius netus vulputate commodo fames integer lacus dictumst.
          Viverra morbi risus ullamcorper at gravida duis. Sit pellentesque
          suspendisse dictum vestibulum mollis iaculis arcu arcu augue.
          Phasellus curabitur eget mauris non. Iaculis arcu pulvinar odio
          lobortis aenean sed elit adipiscing congue. Eget orci aenean risus est
          magna vulputate diam natoque. Tempus id malesuada aliquam semper
          faucibus. Auctor purus tristique vulputate in ut euismod vehicula
          turpis urna. Donec cursus ultrices malesuada morbi ac vitae at.
          Viverra lectus purus ipsum nibh risus scelerisque suspendisse feugiat
          sed. Purus non commodo tortor lobortis neque cursus tortor massa
          dolor. Dui molestie arcu ultricies malesuada. Sed augue ultricies
          tortor in et fames ac tortor. Consectetur nec at tellus neque potenti.
          Eget mi elit lacus augue non tempor aliquet. Varius cursus arcu neque
          venenatis. Ipsum velit enim posuere nulla. Enim cursus a aliquam
          bibendum quisque posuere consequat a. Ut placerat vitae lorem cursus
          amet id quis. Etiam commodo feugiat erat id ac sodales sed. Vitae
          vitae adipiscing fusce quam lacus nibh ligula ac donec. Vel nullam et
          mattis leo est neque vitae a. Nunc libero elit massa aliquam commodo
          cum eu quam ornare. Orci dignissim bibendum vulputate nec ut nisl
          malesuada feugiat in. Morbi cursus orci tincidunt sit dignissim. At
          pulvinar et tristique morbi eleifend congue. Commodo sed venenatis
          laoreet vel. Orci odio etiam lectus at mauris erat sed imperdiet
          viverra. Tellus et egestas nunc turpis. Aliquam ac sagittis leo
          blandit pellentesque aenean ut. Pharetra amet nullam ut nisi sagittis
          id felis risus parturient. Odio tellus ac mattis in scelerisque.
          Libero elementum a et volutpat congue arcu venenatis neque metus. Mus
          phasellus diam vestibulum neque vitae facilisis at cras augue. Lacus
          nisl ut libero suspendisse blandit natoque nunc id. Amet dui
          consectetur etiam lorem nibh tellus. Justo sit ornare fusce eget enim
          at id. Augue sed turpis tempor aenean. Eu suspendisse sit porta
          blandit faucibus aliquam in egestas. In facilisis id erat blandit
          orci. Velit vel dignissim tempor ridiculus neque mattis dictum. Tortor
          vestibulum enim id urna nunc tempor cras. Sit nunc a dictum sagittis
          eu. Nulla id amet at consequat. In vulputate pellentesque at leo orci
          diam. Nisl egestas nibh sed cras et urna pharetra. Diam massa feugiat
          tincidunt risus nunc suscipit malesuada.
        </Text>
      </Box>
    </Box>
  );
};

export default Policy;

const styles = StyleSheet.create({});
