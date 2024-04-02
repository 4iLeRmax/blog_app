// export const getReportComments = async (): Promise<ReportComment[]> => {
//   return await fetch('http://localhost:4200/reportComments').then((res) => res.json());
// };

import { ReportComment } from '@/types';
import prisma from './prisma';

export const getReportComments = async (): Promise<ReportComment[] | undefined> => {
  try {
    const reportComments = await prisma.reportComment.findMany({
      include: {
        Reporters: true,
      },
    });
    return reportComments;
  } catch {
    console.error('ReportComments');
  }
};
