import {
  Router, Request, Response, NextFunction,
} from 'express';

const router = Router();
const professionalsService = require('../services/professionalsService');

router.get(
  '/api/professionals',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const professionals = await professionalsService.getProfessionals();
      res.json(professionals);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/api/professional/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const professionalId = req.params.id;
    try {
      const professional = await professionalsService.getProfessional(
        professionalId,
      );
      res.status(200).json(professional);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/api/professional',
  async (req: Request, res: Response, next: NextFunction) => {
    const professional = req.body;
    try {
      const createNewProfessional = await professionalsService.saveProfessional(
        professional,
      );
      res.status(201).json(createNewProfessional);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/api/professional/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const professionalId = req.params.id;
    const professional = req.body;
    try {
      await professionalsService.updateProfessional(
        professionalId,
        professional,
      );
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/api/professional/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await professionalsService.deleteProfessional(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
