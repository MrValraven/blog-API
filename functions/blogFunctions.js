const getAllBlogpostTitles = (blogposts, blogpostTitles) => {
  blogposts.forEach((element) => {
    blogpostTitles.push({
      title: element.title,
      id: element.id,
    });
  });
};

const getCurrentMonth = (month) => {
  month++; // O valor é incrementado por motivos de logica, visto que Janeiro = 0
  switch (month) {
    case 1:
      return "Janeiro";
    case 2:
      return "Fevereiro";
    case 3:
      return "Março";
    case 4:
      return "Abril";
    case 5:
      return "Maio";
    case 6:
      return "Junho";
    case 7:
      return "Julho";
    case 8:
      return "Agosto";
    case 9:
      return "Setembro";
    case 10:
      return "Outubro";
    case 11:
      return "Novembro";
    case 12:
      return "Dezembro";
    default:
      break;
  }
};

module.exports.getAllBlogpostTitles = getAllBlogpostTitles;
module.exports.getCurrentMonth = getCurrentMonth;
