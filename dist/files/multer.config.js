"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = __importDefault(require("fs"));
const multer_1 = require("multer");
const path_1 = __importStar(require("path"));
let MulterConfigService = class MulterConfigService {
    constructor() {
        this.getRootPath = () => {
            return process.cwd();
        };
    }
    ensureExists(targetDirectory) {
        fs_1.default.mkdir(targetDirectory, { recursive: true }, (error) => {
            if (!error) {
                console.log('Directory successfully created, or it already exists.');
                return;
            }
            switch (error.code) {
                case 'EEXIST':
                    break;
                case 'ENOTDIR':
                    break;
                default:
                    console.error(error);
                    break;
            }
        });
    }
    createMulterOptions() {
        return {
            storage: (0, multer_1.diskStorage)({
                destination: (req, file, cb) => {
                    var _a, _b;
                    const folder = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.folder_type) !== null && _b !== void 0 ? _b : "default";
                    this.ensureExists(`public/images/${folder}`);
                    cb(null, (0, path_1.join)(this.getRootPath(), `public/images/${folder}`));
                },
                filename: (req, file, cb) => {
                    let extName = path_1.default.extname(file.originalname);
                    let baseName = path_1.default.basename(file.originalname, extName);
                    let finalName = `${baseName}-${Date.now()}${extName}`;
                    cb(null, finalName);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];
                const fileExtension = file.originalname.split('.').pop().toLowerCase();
                const isValidFileType = allowedFileTypes.includes(fileExtension);
                if (!isValidFileType) {
                    cb(new common_1.HttpException('Invalid file type', common_1.HttpStatus.UNPROCESSABLE_ENTITY), null);
                }
                else
                    cb(null, true);
            },
            limits: {
                fileSize: 1024 * 1024 * 1
            }
        };
    }
};
exports.MulterConfigService = MulterConfigService;
exports.MulterConfigService = MulterConfigService = __decorate([
    (0, common_1.Injectable)()
], MulterConfigService);
//# sourceMappingURL=multer.config.js.map