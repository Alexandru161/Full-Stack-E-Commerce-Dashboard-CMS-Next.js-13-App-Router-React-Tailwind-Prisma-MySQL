import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        const {billboardId} = params;
        if(!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: billboardId,
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();

        const { storeId, billboardId } = params;
        const { label, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if(!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prismadb.billboard.update({
            where: {
                id: billboardId
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = await auth();
        const { billboardId, storeId } = params;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const billboard = await prismadb.billboard.delete({
            where: {
                id: billboardId,
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}