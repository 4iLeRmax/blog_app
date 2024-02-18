export const getReportComments = async ():Promise<ReportComment[]> => {
  return await fetch('http://localhost:4200/reportComments').then((res) => res.json());
};
