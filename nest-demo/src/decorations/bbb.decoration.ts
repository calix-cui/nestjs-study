import { Aaa } from './aaa.decoration';
import { AaaGuard } from '../aaa.guard';
import { applyDecorators, Get, UseGuards } from "@nestjs/common"



export function Bbb(path, role) {
  return applyDecorators(
    Get(path),
    Aaa(role),
    UseGuards(AaaGuard)
  )
}