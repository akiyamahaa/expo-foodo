import React from "react";
import { Box, ScrollView, Text } from "native-base";
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
    <Box flex={1}>
      <Header.BasicHeader
        title="Chính sách bảo mật"
        handleBtnBack={handleBtnBack}
      />
      <ScrollView p={4} flex={1}>
        <Text>
          Chính sách bảo mật – HanoiEats{"\n\n"}
          1. Mục đích và phạm vi thu thập thông tin{"\n"}
          Ứng dụng HanoiEats có thể thu thập một số thông tin cần thiết để cải
          thiện trải nghiệm người dùng, bao gồm:{"\n"}- Thông tin đăng ký tài
          khoản (tên, email, số điện thoại).{"\n"}- Thông tin vị trí (nếu người
          dùng cho phép) để gợi ý quán ăn gần bạn.{"\n"}- Dữ liệu hành vi trong
          ứng dụng (ví dụ: quán ăn đã xem, đã lưu) nhằm cá nhân hoá gợi ý.
          {"\n\n"}
          2. Phạm vi sử dụng thông tin{"\n"}
          Thông tin người dùng được sử dụng cho các mục đích sau:{"\n"}- Cung
          cấp, duy trì và nâng cấp dịch vụ của HanoiEats.{"\n"}- Cá nhân hoá
          trải nghiệm gợi ý quán ăn.{"\n"}- Hỗ trợ chăm sóc khách hàng, xử lý
          phản hồi và khiếu nại.{"\n"}- Gửi thông báo về quán ăn mới, chương
          trình khuyến mãi (nếu bạn đồng ý).{"\n\n"}
          3. Lưu trữ và bảo mật thông tin{"\n"}- Dữ liệu cá nhân được lưu trữ
          trên hệ thống máy chủ an toàn, tuân thủ các quy định bảo mật.{"\n"}-
          HanoiEats áp dụng biện pháp kỹ thuật (mã hoá, phân quyền truy cập) để
          ngăn chặn truy cập trái phép, mất mát hoặc lạm dụng thông tin.{"\n"}-
          Chúng tôi không bán hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ
          ba khi chưa có sự đồng ý.{"\n\n"}
          4. Quyền của người dùng{"\n"}
          Người dùng có quyền:{"\n"}- Kiểm tra, cập nhật, chỉnh sửa hoặc xoá
          thông tin cá nhân của mình bất kỳ lúc nào.{"\n"}- Từ chối nhận thông
          báo marketing từ ứng dụng.{"\n"}- Yêu cầu chúng tôi xoá dữ liệu đã lưu
          trữ liên quan đến tài khoản.{"\n\n"}
          5. Chia sẻ thông tin với bên thứ ba{"\n"}
          Trong một số trường hợp, chúng tôi có thể chia sẻ thông tin với đối
          tác tin cậy (ví dụ: dịch vụ bản đồ, thanh toán) để đảm bảo trải nghiệm
          dịch vụ. Việc chia sẻ sẽ luôn tuân thủ các nguyên tắc bảo mật.{"\n\n"}
          6. Thay đổi chính sách bảo mật{"\n"}
          HanoiEats có thể điều chỉnh chính sách này theo thời gian. Mọi thay
          đổi quan trọng sẽ được thông báo trong ứng dụng hoặc qua email (nếu
          có).{"\n\n"}
          7. Thông tin liên hệ{"\n"}
          Nếu bạn có bất kỳ thắc mắc nào về Chính sách bảo mật, vui lòng liên
          hệ:{"\n"}
          📧 Email: support@hanoieats.vn{"\n"}
        </Text>
      </ScrollView>
    </Box>
  );
};

export default Policy;
