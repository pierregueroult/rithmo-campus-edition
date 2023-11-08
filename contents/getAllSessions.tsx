import prisma from "../prisma/prisma";
import { Session } from "@prisma/client";

const getAllSessions = async (): Promise<Session[]> => {
  var sessions = await prisma.session.findMany();

  return sessions;
};

export default getAllSessions;
