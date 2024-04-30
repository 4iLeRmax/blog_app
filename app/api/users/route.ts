import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const info = await req.json();

  if (info.type === 'email') {
    const user = await prisma.users.findUnique({
      where: { email: info.data },
    });
    return NextResponse.json(user);
  } else if (info.type === 'name') {
    const user = await prisma.users.findUnique({
      where: { name: info.data },
    });
    return NextResponse.json(user);
  }
};
