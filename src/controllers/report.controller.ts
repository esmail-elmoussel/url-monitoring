import { Request, Response } from 'express';
import { Dependencies } from '../types/container.types';

export class ReportController {
  reportService;

  constructor({ reportService }: Dependencies) {
    this.reportService = reportService;
  }

  get = async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const { urlId } = req.params;

    const report = await this.reportService.get(urlId, userId);

    return res.json(report);
  };
}
