<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractApiController
{
    /**
     * @Route("/{reactRouting}", name="index", requirements={"reactRouting"="^(?!api).+"}, defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('base.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }
}
